import React, { Component } from 'react'
import Patient from '../../../build/Patient.json'
import web3 from '../../util/web3'


class PatientForm extends Component {
    state={
        name: '',
        age: '',
        sex: '',
        visitCount: '',
        doctor: '',
        errorMessage: ''
    }

    onChange = (e) => {
        e.preventDefault()
        console.log(e.target)
    }

    onSubmit = async(e) => {
        e.preventDefault()
        const patient = Patient(this.props.address)
        this.setState({ loading: true, errorMessage: "" }) //reset error message
        try{
            const accounts = await web3.eth.getAccounts()
            await patient.methods._createPatientRecord(this.state.name, this.state.age, this.state.sex).send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })

            Router.replaceRoute(`/campaigns/${this.props.address}`)
        }catch (err){
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false, value: '' })
    }

    render() {
        console.log(this.props)
        return (
            <form>
                <h2>Crypto Tracker Sign In!</h2>
                <label>Name</label>
                <input name='name' type='text' onChange={this.onChange} />
                <label>Age</label>
                <input name='age' type='text' onChange={this.onChange} />
                <label>Sex</label>
                <input name='sex' type='text' onChange={this.onChange} />

                <button onClick={this.onSubmit}>Add Patient</button>
            </form>
            // <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}> 
            //     <Form.Field>
            //         <label>Amount to Contribute</label>
            //         <Input 
            //             value={this.state.value}
            //             onChange={e => this.setState({ value: e.target.value })}
            //             label="ether" 
            //             labelPosition="right" 
            //         />
            //         <Message error header="Oops!" content={this.state.errorMessage} />
            //         <Button primary loading={this.state.loading}>Contribute</Button>
            //     </Form.Field>
            // </Form>
        )
    }
}

export default ContributeForm