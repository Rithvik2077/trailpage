import React from 'react'

export default function SurveyResponse({response}) {


    function responseDataToHTML(response){
        console.log('hello this is your response****', response)
        const htmlString = JSON.parse(response);
        console.log('This is htmlString', htmlString[htmlString.length - 1])
        const formdiv = document.createElement('div')
        formdiv.innerHTML = htmlString[htmlString.length - 1];
        // document.getElementById('form').appendChild(formdiv);
        
        const formElement = document.getElementById('form');
            if (formElement) {
                formElement.appendChild(formdiv);
            } else {
                console.error('Element with ID "form" not found in the document.');
            }
        
    }

    responseDataToHTML(response)
    
  return (
    <>
        <div id={'form'}>
      
        </div>
    </>
  )
}
