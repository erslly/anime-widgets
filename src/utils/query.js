// @ts-check
export default `query ($name: String) {
  User(name: $name) {
    id
    name
    avatar { large }
    statistics {
      anime {
        count
        meanScore
        minutesWatched
        episodesWatched
        statuses { status count }
      }
    }
  }
  MediaListCollection(userName: $name, type: ANIME, sort: UPDATED_TIME_DESC) {
    lists {
      entries {
        media {
          title { romaji }
          coverImage { large }
          episodes
        }
        status
        progress
        score
        updatedAt
      }
    }
  }
}`;
