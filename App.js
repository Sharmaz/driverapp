import React, {Component} from 'react';
import ExternalRoutes from './routes/ExternalRoutes';
import InternalRoutes from './routes/InternalRoutes'
import { Provider, Subscribe } from 'unstated';
import sessionState from './states/session';
import { View, Text } from 'react-native';

class App extends Component {
  render() {
    return (
      <Provider>
        <Subscribe to={[sessionState]}>
          {(session) => {
            session.verify();
            if (session.state.isLogued == null) {
              return <View><Text>Espere un momento</Text></View>
            } else if (session.state.isLogued) {
              return <InternalRoutes />
            } else {
              return <ExternalRoutes />
            }
          }}
        </Subscribe>
      </Provider>
    );
  }
}

export default App;
