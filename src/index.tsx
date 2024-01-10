import { ActionPanel, List, Action, Color, Icon, Detail } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { ScheduleResponse, EventsItem, LinksItem } from "./response";


function GameDetailView(props: { gameInfo: EventsItem }) {
  const { gameInfo } = props;
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateOption: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };

  const gameDate = new Date(gameInfo.date);
  const gameTime = gameDate.toLocaleDateString([], dateOption) + " " + gameDate.toLocaleTimeString([], timeOptions);
  const gameScore = gameInfo.competitions[0].competitors[1].score + "-" + gameInfo.competitions[0].competitors[0].score;
  const networks = gameInfo.competitions[0].broadcasts.map((broadcast: BroadcastsItem) => broadcast.names).join(", ");
  return (
    <Detail
      markdown={formatGameToMarkdown(gameInfo)}
      navigationTitle={gameInfo.name}
      metadata={
        <Detail.Metadata>
          {gameInfo.status.type.completed && <Detail.Metadata.Label title="Game Score" text={gameScore} />}
          {gameInfo.status.type.completed && <Detail.Metadata.Separator />}

          <Detail.Metadata.Label title="Game Time" text={gameTime} />
          <Detail.Metadata.TagList title="Venue">
            <Detail.Metadata.TagList.Item
              text={gameInfo.competitions[0].venue.fullName}
              color={gameInfo.competitions[0].competitors[0].team.color}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Label title="Networks" text={networks} />
          <Detail.Metadata.Separator />
        </Detail.Metadata>
      }
    />
  );
}

function formatGameToMarkdown(gameInfo: EventsItem) {
  let markdownText = ``;
  //   markdownText += `## ![Away Team Logo](${gameInfo.awayTeam.logo}?raycast-width=25&raycast-height=25) ${gameInfo.awayTeam.placeName.default} (${gameInfo.awayTeam.abbrev}) @  ${gameInfo.homeTeam.placeName.default} (${gameInfo.homeTeam.abbrev}) ![Home Team Logo](${gameInfo.homeTeam.logo}?raycast-width=25&raycast-height=25)\n\n`;
  markdownText += `## ![Team Logo](${gameInfo.competitions[0].competitors[1].team.logo}?raycast-width=150&raycast-height=150)`;
  markdownText += ` @ `;
  markdownText += `![Team Logo](${gameInfo.competitions[0].competitors[0].team.logo}?raycast-width=150&raycast-height=150)\n\n`;

  markdownText += `\n### Useful Links\n\n`;
  gameInfo.links.forEach((link: LinksItem) => {
    markdownText += `- [${link.text}](${link.href})\n`;
  });

  return markdownText;
}

export default function Command() {
  const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`;
  const { isLoading, data } = useFetch(url) as {
    isLoading: boolean;
    data: ScheduleResponse;
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateOption: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };

  /// Organise the data into a chronological list, where it is organised by the day like "Saturday" make them into List Sections
  /// Each List Section has a header of the day and then the list of games for that day
  const listSections =
    data?.events?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .reduce((gamesPerDay: any, event: EventsItem) => {
        const day = new Date(event.date).toLocaleDateString([], dateOption);
        if (!gamesPerDay[day]) {
          gamesPerDay[day] = [];
        }
        /// Only push unique games into the list
        gamesPerDay[day].push(event);
        return gamesPerDay;
      }, {});

  return (
    <List isLoading={isLoading}>
      {listSections &&
        Object.keys(listSections).map((date: string) => {
          return <NFLRow date={date} listSections={listSections} timeOptions={timeOptions} />;
        })}
      <List.EmptyView icon={{ source: "nfl-logo.png" }} title="Something went wrong" />
    </List>
  );
}
function NFLRow(props: { date: string, listSections: any, timeOptions: Intl.DateTimeFormatOptions }) {
  return <List.Section title={props.date}>
    {props.listSections[props.date].map(
      (event: EventsItem) => event && (
        <List.Item
          key={event.id}
          title={event.name}
          subtitle={event.shortName}
          actions={<ActionPanel>
            <Action.Push title="View Game Details" target={<GameDetailView gameInfo={event} />} />
          </ActionPanel>}
          accessories={[
            // If the game happened, display the score, make it a tag and show it like
            event.status.type.completed
              ? {
                tag: {
                  value: "FINAL " +
                    event.competitions[0].competitors[0].score +
                    "-" +
                    event.competitions[0].competitors[1].score,
                  color: Color.PrimaryText,
                },
              }
              : {},
            // time options for the game
            {
              text: {
                value: new Date(event.date).toLocaleTimeString([], props.timeOptions),
                color: Color.PrimaryText,
              },
            },
            /// Away Team Logo
            { icon: event.competitions[0].competitors[1].team.logo },
            /// VS
            { text: { value: "vs", color: Color.PrimaryText } },
            /// Home Team Logo
            { icon: event.competitions[0].competitors[0].team.logo },
          ]} />
      )
    )}
  </List.Section>;
}

