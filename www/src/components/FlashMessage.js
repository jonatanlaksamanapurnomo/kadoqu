import React, {Component} from 'react';

class FlashMessage extends Component {
    render() {

        if (this.props.isError) {
            return (<div className={"alert alert-danger " + this.props.className} role="alert">
                {this.props.message}
            </div>);

        } else {
            return (
                <div className={"alert alert-success " + this.props.className} role="alert">
                    {this.props.message}
                </div>
            );
        }
        // return (
        //     {
        //         this.props.isError ? (
        //
        //         ) : ("asdasd")
        //     }
        //
        // );
    }
}

export default FlashMessage;