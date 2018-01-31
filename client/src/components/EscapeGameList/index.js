import React, {Component} from 'react';
import { List } from 'semantic-ui-react';
import EscapeItem from '../EscapeItem';

export default class EscapeGameList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      escapes: '',
    };
  }

  componentDidMount(){
    console.log("totot");
    var headers = new Headers();
    var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
    fetch('http://localhost:3001/escapelist', init).then(res => res.json()).then(escapes => this.setState({ escapes: escapes, }));
  }

  render() {
    console.log(this.state.escapes);
    if (!this.state.escapes){
      return(
        <p></p>
      );
    } else {
      return (
        <div>
          <h1 style={{ paddingLeft: '100px' }}>Tous les escapes games</h1>
          <List divided relaxed>
            {this.state.escapes.map(escape =>
              <EscapeItem
                key={escape.objectID}
                escape={escape}
              >
                <EscapeHeader escape={escape} />
              </EscapeItem>
            )}
          </List>
        </div>
      );
    }
  }
}

const EscapeHeader = ({ escape }) =>
  <span>
    <p>{escape.nom}</p>
  </span>