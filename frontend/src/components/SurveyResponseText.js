import React, {useState} from 'react';
import { Text } from 'react-native';
import { ResponseText } from './styles';

export default function SurveyResponseText(props){
    const rating = props.props[0]
    const axis = props.props[1]

    const RatingColour = ()=>{
        let colours = {"GOOD": '#33a244', "WARNING": '#e69a11', "RISK": '#d33c19'}
        if (rating=="GOOD"){
            return <Text style={{fontWeight:'bold', color: colours["GOOD"]}}>{rating}</Text>
        }  else if (rating=="WARNING"){
            return <Text style={{fontWeight:'bold', color: colours["WARNING"]}}>{rating}</Text>
        } else {
            return <Text style={{fontWeight:'bold', color: colours["RISK"]}}>{rating}</Text>
        }
    }

    const AxisText = ()=>{
        return <Text>{axis}{'\n'}</Text>
    }


    return (
    <ResponseText><RatingColour></RatingColour><AxisText></AxisText></ResponseText>
    )
}