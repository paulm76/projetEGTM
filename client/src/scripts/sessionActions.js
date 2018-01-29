import { sessionService } from 'redux-react-session';


export const logout = (history) => {
  return () => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      history.push('/');
    }
};
