import Axios from "axios";
import { useState, useEffect } from "react";
import './AddPictureForm.css';
import TextField from '@mui/material/TextField';


// this is the element on the top part of the page used to add pictures to the gallery
function AddPictureForm(props) {

    const [viewForm, setViewForm] = useState(false);
    const [urlValue, setUrlValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');

    // hanldeSubmit verifies fields are completed before calling postPicture()
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!urlValue || !descriptionValue) {
            Swal.fire('Please complete all fields');
            return;
        } else {
            postPicture();
        };
    };

    // sends new picture details to DB via API, then requests the updated data from the DB
    const postPicture = () => {
        Axios.post('/gallery', { path: urlValue, description: descriptionValue }).then(response => {
            props.getGallery();
            setUrlValue('');
            setDescriptionValue('');
            setViewForm(false);
        }).catch(error => {
            alert('error POSTing', error);
        });
    };


    // returns form for entering a new picture, requires user to click on a banner item before form opens
    return (
        <div className="addPictureDiv">
            {(viewForm) ?
                <div className="addPictureTrue">
                    <h3>Add a picture:</h3>
                    <form className="inputForm" onSubmit={handleSubmit}>

                        <TextField 
                            id="urlInput"
                            placeholder="Enter URL"
                            onChange={(e) => { setUrlValue(e.target.value) }} 
                            value={urlValue}
                            sx={{ bgcolor: 'white'}}
                            width={180}
                        />
                        <TextField
                            id="descriptionInput"
                            placeholder="Brief description here"
                            multiline
                            rows={3}
                            onChange={(e)=>{setDescriptionValue(e.target.value)}} 
                            value={descriptionValue}
                            sx={{ bgcolor: 'white' }}                     
                        />
                        <br />
                        <button type="submit" className="btn btn-success">Add Picture</button>
                        <button className="btn btn-warning" onClick={() => setViewForm(!viewForm)}>Cancel</button>
                    </form>
                </div>
                : <h3 className="clickMe" onClick={() => setViewForm(!viewForm)}>Click here to add your own picture!</h3>
            }

        </div>
    );
};

export default AddPictureForm;