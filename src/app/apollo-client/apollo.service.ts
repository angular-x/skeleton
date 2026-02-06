import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  queryUsers() {
    console.info('queryUsers');

    let result = this.apollo.query({
      query: gql`
        query {
          users {
            email
          }            
        }
      `,
    });
    result.subscribe((result) => {
      console.log(result);
    });
    return result;
  }
}
