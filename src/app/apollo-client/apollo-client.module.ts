import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
  Inject,
} from '@angular/core';

// Apollo.
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import {
  ApolloLink,
  InMemoryCache,
  // NextLink
} from '@apollo/client/core';

// Files.
// import extractFiles from "extract-files/extractFiles.mjs";

// Config.
import { uri } from './apollo-client.config';
// import { CryptocalStorage } from '../crypto/cryptocal-storage.class';


// const basic = new ApolloLink((operation, forward: NextLink) => {
//   operation.setContext({
//     headers: {
//       Accept: 'charset=utf-8',
//     },
//   });
//   return forward(operation);
// });

// const auth = new ApolloLink((operation, forward: NextLink) => {
//   operation.setContext({
//     headers: {
//       Accept: 'charset=utf-8',
//       Authorization: localStorage.getItem('token'),
//     },
//   });
//   return forward(operation);
// });

@NgModule({
  imports: [HttpClientModule],
  providers: [
    // Basic Apollo configuration.
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({ uri }),
      }),
      deps: [HttpLink],
    }
    // Advanced Apollo configuration with auth link.
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory(httpLink: HttpLink): any {
    //     return {
    //       cache: new InMemoryCache(),
    //       link: ApolloLink.from([
    //         basic,
    //         new ApolloLink((operation, forward: NextLink) => {
    //           operation.setContext({
    //             headers: {
    //               Authorization: localStorage.getItem('token') || '' // cryptocalStorage?.get('token') || '',
    //             },
    //           });
    //           return forward(operation);
    //         }),
    //         httpLink.create({ uri: 'https://localhost:3000/graphql' }),
    //       ]),
    //       withCredentials: true,
    //       // extractFiles,
    //     };
    //   },
    //   deps: [HttpLink],
    // },
  ],
})
export class ApolloClientModule {}