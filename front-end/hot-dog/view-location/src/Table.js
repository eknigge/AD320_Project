import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/core/Icon';


import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
       '& .MuiTextField-root':{
           margin: theme.spacing(1),

       },
    },

    button: {
        margin: theme.spacing(1),
      }

}))


function Table() {  
    const classes = useStyles();
    const [inputFields, setInputFields] = useState([
        { type: '', lati: '', longi: '', address: ''},
        
    ]);

{/*To type*/}

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
        }

{/*For console to indicate it works*/}

     const handleSubmit = (e) => {
         e.preventDefault();
         console.log("InputArray", inputFields);
        };

{/*To remove*/}

    const handleRemoveFields = (index) => {
        const values  = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

{/*To add*/}

const handleAddFields = () => {
    setInputFields([...inputFields, {type: '', lati: '', longi: '', address: '' }])
}

        

  return(

    <Container>
        
        <h1>Add New Locations</h1>
        
        <form className={classes.root} onSubmit={handleSubmit}>
            { inputFields.map((inputFields, index) => (
                <div key={index}>

                    <TextField
                       name= "type"
                       label= "Name"
                       variant='filled'
                       value={inputFields.type}
                       onChange={event => handleChangeInput(index, event)}
                    />

                    <TextField
                       name= "lati"
                       label= "Latitude"
                       variant='filled'
                       value={inputFields.lati}
                       onChange={event => handleChangeInput(index, event)}
                    />

                    <TextField
                       name= "longi"
                       label= "Longitude"
                       variant='filled'
                       value={inputFields.longi}
                       onChange={event => handleChangeInput(index, event)}
                    />

                    <TextField
                       name= "address"
                       label= "Address"
                       variant='filled'
                       value={inputFields.address}
                       onChange={event => handleChangeInput(index, event)}
                    />

                    <IconButton  onClick={handleAddFields}>
                        <AddIcon />
                    </IconButton>

                    <IconButton onClick={handleRemoveFields}>
                        <RemoveIcon />
                    </IconButton>

                </div>
            ))}

            <Button 
               className={classes.button}
               variant='contained'
               color='primary' 
               type='submit' 
               endIcon={<SendIcon>send</SendIcon>}
               onClick = {handleSubmit}
               >Send</Button>
              

        </form>
    </Container>    

  );

}


export default Table;


