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

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({isLoading: true})

        const rawResponse = await fetch('https://even-more-cocktails-api.herokuapp.com/api/v1/cocktails', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: e.target.title.value, description: e.target.description.value})
          })
          .then((response) => {
            console.log(response.json());
            this.setState({isOpen: false})
            this.setState({isLoading: false})
          })

        //   const content = await rawResponse.json();
        //   console.log(content);

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
                                    Description:
                                    <input className="form-input" name="description" type="text" />
                                </label>
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