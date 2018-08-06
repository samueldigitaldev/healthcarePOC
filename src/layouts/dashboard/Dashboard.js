import React, { Component } from 'react'
import PatientRecord from '../../../build/contracts/PatientRecord.json'
import getWeb3 from '../../util/getWeb3'
import ipfs from '../../ipfs'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    this.state = {
      web3: null, 
      buffer: null,
      patientImage: '',
      account: null,
      authData: this.props
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch((err) => {
      console.log('Error finding web3.', err)
    })
  }

  instantiateContract() {
    /*
    * SMART CONTRACT EXAMPLE
    *
    * Normally these functions would be called in the context of a
    * state management library, but for convenience I've placed them here.
    */
    const contract = require('truffle-contract')
    const patientRecord = contract(PatientRecord)
    patientRecord.setProvider(this.state.web3.currentProvider)

    //Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      patientRecord.deployed().then((instance) => {
        this.PatientRecordInstance = instance
        this.setState({ account: accounts[0] })
        // Get the value from the contract to prove it worked.
        return this.PatientRecordInstance.getPatientImage.call(accounts[0])
      }).then((patientImage) => {
        // Update state with the result.
        return this.setState({ patientImage })
      })
    })
  }

  captureFile = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result) })
    }

  }
  onSubmit = (e) => {
    e.preventDefault()
    ipfs.files.add(this.state.buffer, (err, result) => {
      if (err) {
        console.error(err)
        return
      } else {
        console.log(this)
        console.log(this.PatientRecord)
        console.log(this.PatientRecordInstance)
        this.PatientRecordInstance.setPatientImage(result[0].hash, {from: this.state.account}).then((r) => {
          return this.setState({ patientImage: result[0].hash })
        })
      }
    })
  }


  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Hello {this.props.authData.name}!</strong> Please Review Your Health Records:</p>
            <h1>Your Health Information</h1>
              <img src={`https://ipfs.io/ipfs/${this.state.patientImage}`} alt="" height="300px" width="300px"/> 
              <h2>Upload Image</h2>
              <form onSubmit={this.onSubmit}>
                <input type='file' onChange={this.captureFile} />
                <input type='submit'/>
              </form>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
