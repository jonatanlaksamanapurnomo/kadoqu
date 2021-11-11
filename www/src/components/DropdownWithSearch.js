import React, {Component} from 'react';
import {Dropdown} from "react-bootstrap";
import "./DropdownWithSearch.css";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
  // eslint-disable-next-line
  <a
    href="#"
    style={{color: "#00998d"}}
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// const CustomMenu = React.forwardRef(
//   ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
//     const [value, setValue] = useState('');
//
//     return (
//       <div
//         ref={ref}
//         style={style}
//         className={className}
//         aria-labelledby={labeledBy}
//       >
//         <FormControl
//           autoFocus
//           className="mx-3 my-2 w-auto"
//           placeholder="Select Color"
//           onChange={e => {
//             setValue(e.target.value)
//           }}
//           value={value}
//         />
//         <ul className="list-unstyled">
//           {React.Children.toArray(children).filter(
//             child =>
//               !value || child.props.children.toLowerCase().startsWith(value),
//           )}
//         </ul>
//       </div>
//     );
//   },
// );

class DropdownWithSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedColor: ""
    };
    this.handleSelect = this.handleSelect.bind(this);
  }


  handleSelect(e) {
    this.setState({
      selectedColor: e
    }, () => {
      this.props.selectedColor(this.state.selectedColor);
    })
  }

  render() {

    return (
      <Dropdown
        className={this.props.className}
        onSelect={this.handleSelect}>
        < Dropdown.Toggle as={CustomToggle}
                          id="dropdown-custom-components">
          {this.props.toggleMessage}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.props.data.map((item, i) => (
            <Dropdown.Item eventKey={item.name} key={i}>
              <div className="row">
                <div className="col-4">
                  <div style={{background: item.name}}
                       className="color-input"></div>
                </div>
                <div className="col-8  mt-1 ">
                  {item.name}
                </div>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>


    );
  }
}

export default DropdownWithSearch;
