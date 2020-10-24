import React from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent,axios) =>{
    
    return class extends React.Component{

        state = {
            error: null
        }

        componentWillMount(){
            // folosesti interceptors si atunci cand se intampla orice cerere cu obiectul axios vei primi raspunsul sau eroarea, aici faci handle la eroare
            this.reqInterceptor = axios.interceptors.request.use(req=>{

                this.setState({error: null});
                return req;

            });

            this.responseInterceptor = axios.interceptors.response.use(null, error =>{
                this.setState({error: error})
            });

        }

        errorConfimedHandler =()=> {
            this.setState({
                error:null
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render() {

            return(

                <React.Fragment>

            <Modal show={this.state.error} closeModal={this.errorConfimedHandler} >
                {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
        </React.Fragment>

            )
        }
    }
}

export default withErrorHandler;