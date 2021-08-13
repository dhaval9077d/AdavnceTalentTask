import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Grid, GridColumn,Label } from 'semantic-ui-react';
import moment, { now } from 'moment';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        const visaDetail = this.props.visaDetail ?
            Object.assign({}, this.props.visaDetail)
            : {
                visaStatus:'',
                visaExpiryDate:null
            }
        this.state={
            visible:false,
            newVisaDetail:visaDetail,
            formErrors: '',
            formValid: false
        }
        this.onUpdateVisaStatus=this.onUpdateVisaStatus.bind(this)
        this.onChangeVisaDate=this.onChangeVisaDate.bind(this)
        this.onClickSave=this.onClickSave.bind(this)
    }
    onUpdateVisaStatus(event)
    {
        if(event.target.value == "Work" || event.target.value == "Student")
        {
        const newVisaDetail=this.state.newVisaDetail
        newVisaDetail.visaStatus=event.target.value
        this.setState(
            {
                visible:true,
                newVisaDetail
            }
        )
        }
        else
        {
            this.setState(
                {
                    visible:false
                }
            )
            this.props.saveProfileData({visaStatus : event.target.value})
        }
    }
    onChangeVisaDate(event,data)
    {
        let newVisaDetail=this.state.newVisaDetail
        newVisaDetail.visaExpiryDate=(event.target.value)
        this.setState(
            {
                formValid: false,
                newVisaDetail
            }
        )
        if(this.state.newVisaDetail.visaExpiryDate == null || this.state.newVisaDetail.visaExpiryDate == "")
        {
            this.setState(
                {
                    formErrors: 'please enter the visa expiry date',
                    formValid: true
                }
            )
        }
    }
    onClickSave()
    {
        if(this.state.newVisaDetail.visaExpiryDate == null || this.state.newVisaDetail.visaExpiryDate == "")
        {
            this.setState(
                {
                    formErrors: 'please enter the visa expiry date',
                    formValid: true
                }
            )
        }
        else
        {
        this.props.saveProfileData({visaStatus :this.state.newVisaDetail.visaStatus,visaExpiryDate : this.state.newVisaDetail.visaExpiryDate})
        this.props.loadData()
        this.setState(
            {
                formValid: false
            }
        )
        }
    }
    render() {
        let visible=this.state.visible
        let visible1
         if(this.props.visaDetail.visaStatus == "Work" || this.props.visaDetail.visaStatus == "Student")
            {
                visible1=true
            }
            else
            {
                visible1=false
            }
        return(
            <div className='row'>
            <div className="ui sixteen wide column">
            <Grid>
                <Grid.Column width={6}>
                <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"20px" }}>Visa Type</label>
                <select label='Visa Type' name='level' value={this.props.visaDetail.visaStatus} onChange={this.onUpdateVisaStatus}>
                            <option value="Citizen">Citizen</option>
                            <option value="Permanent Resident">Permanent Resident</option>
                            <option value="Work">Work Visa</option>
                            <option value="Student">Student Visa</option>
                        </select>
                </Grid.Column>
                {visible || visible1 ?
                <Grid.Column width={10}>
                    <Grid>
                        <Grid.Column width={10}>
                            <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"20px" }}>Visa expiry date</label>
                            <input
                                    type='date'
                                    name="visaExpiryDate"
                                    placeholder="Date"
                                    content={this.state.newVisaDetail.visaExpiryDate}
                                    onChange={this.onChangeVisaDate}
                                    defaultValue={moment(this.props.visaDetail.visaExpiryDate).format(moment.HTML5_FMT.DATE)}
                                    min={moment().format('YYYY-MM-DD')}
                                />
                                { this.state.formValid && <Label basic color='red' pointing > { this.state.formErrors } </Label> }
                        </Grid.Column>
                        <GridColumn>
                            <br/>
                            <button type="button" className="ui teal button" onClick={this.onClickSave}>Save</button>
                        </GridColumn>
                    </Grid>
                </Grid.Column>
               :null 
            }
           </Grid>
            </div>
        </div>
        )
    }
}