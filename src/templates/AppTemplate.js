import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import styled from 'styled-components';
import AppNav from '../components/AppNav';
import Messages from '../pages/Messages';
import Profile from '../pages/Profile';
import AppHeader from '../components/AppHeader';
import { useChat } from '../hooks/useChat';
import Chat from '../components/Chat';
import { devices } from '../assets/styles/devices';

const Container = styled.div`
  width: 100vw;
  height: var(--app-height);
  display: flex;
  flex-direction: column;

  @media ${devices.tablet} {
    width: 50vw;
    border-right: 1px solid ${({ theme }) => theme.color.border};
  }

  @media ${devices.laptop} {
    width: 30vw;
  }
`;

const AppTemplate = () => {
  const { isChatOpen } = useChat();
  return (
    <Container>
      <Router>
        {isChatOpen && <Chat isChatOpen={isChatOpen} />}
        <AppHeader />
        <Switch>
          <Route exact path="/" component={Messages} />
        </Switch>
        <Switch>
          <Route path="/browse" component={Home} />
        </Switch>
        <Switch>
          <Route path="/profile" component={Profile} />
        </Switch>
        <AppNav />
      </Router>
    </Container>
  );
};

export default AppTemplate;
