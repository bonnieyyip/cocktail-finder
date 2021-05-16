import React from 'react';
import ReactModal from 'react-modal';

class CreateRecipeModal extends React.Component {
    state = {
        isOpen: false,
        isLoading: false
    }

    openModal = () => {
        this.setState({isOpen: true})
    }
   
    closeModal = () => {
        this.setState({isOpen: false})
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({isLoading: true})

        const file = document.querySelector('#fileinput').files[0];
    
        if (file !== undefined) {
            this.toBase64(file).then(data => {
                    //https://even-more-cocktails-api.herokuapp.com
                
                    var binaryData = Buffer.from(data.split(",")[1],"base64");
                    const rawResponse = fetch('http://localhost:3000/api/v1/cocktails', {
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({strDrink: e.target.title.value, strInstructions: e.target.description.value, strDrinkThumb: data})
                    })
                    .then((response) => {
                        this.setState({isOpen: false})
                        this.setState({isLoading: false})
                    })
                    .catch(err => console.log("ERR: " + err));
                }
            );
        }
    }

    render() {
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              backgroundColor       : '#F0AA89'      
            }
        };

        return (
            <div>
                {console.log("state is currently: " + this.state.isOpen)}
                <button className="form-button" onClick={this.openModal}>Create New Recipe</button>
                <ReactModal
                    style={customStyles}
                    isOpen={this.state.isOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="New Recipe Modal"
                    >
            
                    <div className="row">
                        <div className="col-md-8">
                            <h2>Submit Your Cocktail</h2>
                        </div>
                        <div className="col-md-4">
                            <button className="form-button" onClick={this.closeModal} style={{float: "right"}}>X</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Title:
                                    <input className="form-input" name="title" type="text" />
                                </label>
                                <label>
                                    Instructions:
                                    <input className="form-input" name="description" type="text" />
                                </label>
                                <br/>
                                <label>Upload image of cocktail (optional)</label>
                                <input type="file" id="fileinput" name="fileinput" accept=".jpg, .jpeg, .png"></input>
                                <button className="form-button" type="submit" disabled={this.state.isLoading}>{this.state.isLoading ? "Submitting..." : "Submit"}</button>
                            </form> 
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default CreateRecipeModal;