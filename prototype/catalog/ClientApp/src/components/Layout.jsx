import React, { Component } from 'react';
import { Container, Grid } from '@material-ui/core';
import SidebarMenu from './SidebarMenu';
import TopMenu from './TopMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <TopMenu />
        <Grid container>
          <Grid item xs={2}>
            <SidebarMenu />
          </Grid>
          <Grid item xs={10}>
            <Container>
              {this.props.children}
            </Container>
          </Grid>
        </Grid>
      </div>
    );
  }
}
