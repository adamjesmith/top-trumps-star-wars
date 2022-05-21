import { gql } from '@apollo/client';

export const getStarshipsQuery = gql`
  query getStarShips {
    allStarships {
      starships {
        name
        costInCredits
        passengers
        maxAtmospheringSpeed
        filmConnection {
          totalCount
        }
      }
    }
  }
`;
