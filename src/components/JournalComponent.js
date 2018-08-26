import React, { Component } from 'react';
import {
  Card, CardImg, CardImgOverlay, CardTitle
} from 'reactstrap';
import { matchesUrl } from '../shared/matchesUrl';
import { baseUrl } from '../shared/baseUrl';

function RenderMatchItem({ match }) {
  return (
    <Card key={match.id}>
      <a href={`${baseUrl}profiles/${match.missingId}`}>
        <CardImg width="100%" src={match.imageUrl} alt={match.missingName} />
        <CardImgOverlay>
          <CardTitle>{match.missingName}</CardTitle>
        </CardImgOverlay>
      </a>
    </Card>
  );
}

class Journal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: []
    }
  }

  componentDidMount() {
    fetch(matchesUrl)
      .then(response => response.json())
      .then(matches => {
        this.setState({
          matches: matches
        });
      })
      .catch(err => alert(err));
  }

  render() {
    const journal = this.state.matches.map((match) => {
      return (
        <div className="col-12 col-md-5 m-1" key={match.id}>
          <RenderMatchItem match={match} />
        </div>
      );
    });

    return (
      <div className="container" >
        <div className="row">
          <div className="col-12">
            <h3>Matches</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          {journal}
        </div>
      </div>
    );
  }
}

export default Journal;