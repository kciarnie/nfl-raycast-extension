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
  const game = gameInfo.competitions[0];
  const homeTeam = game.competitors[0];
  const awayTeam = game.competitors[1];
  const gameTime = gameDate.toLocaleDateString([], dateOption) + " " + gameDate.toLocaleTimeString([], timeOptions);
  const gameScore = awayTeam.score + "-" + homeTeam.score;
  const networks = game.broadcasts.map((broadcast: BroadcastsItem) => broadcast.names).join(", ");
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
              text={game.venue.fullName}
              color={homeTeam.team.color}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Label title="Networks" text={networks} />

          <Detail.Metadata.Label title="Weather" text={`${gameInfo.weather.temperature}°F - ${gameInfo.weather.displayValue} `} />
          <Detail.Metadata.Separator />

          <Detail.Metadata.Label title={`${homeTeam.team.abbreviation} Team Record`} text={homeTeam.records[0].summary} />
          <Detail.Metadata.Label title="Away Team Record" text={awayTeam.records[0].summary} />
        </Detail.Metadata>
      }
    />
  );
}

function formatGameToMarkdown(gameInfo: EventsItem) {
  let homeTeam = gameInfo.competitions[0].competitors[0];
  let awayTeam = gameInfo.competitions[0].competitors[1];

  let markdownText = ``;
  markdownText += `## ![Team Logo](${awayTeam.team.logo}?raycast-width=150&raycast-height=150)`;
  markdownText += ` @ `;
  markdownText += `![Team Logo](${homeTeam.team.logo}?raycast-width=150&raycast-height=150)\n`;
  markdownText += `### ${awayTeam.team.displayName} (${awayTeam.records[0].summary}) at ${homeTeam.team.displayName} (${homeTeam.records[0].summary})\n\n`;

  markdownText += `\n### Useful Links\n\n`;
  gameInfo.links.forEach((link: LinksItem) => {
    markdownText += `- [${link.text}](${link.href})\n`;
  });

  const awayPassingLeader = awayTeam.leaders[0].leaders[0];
  const awayRushingLeader = awayTeam.leaders[1].leaders[0];
  const awayReceivingLeader = awayTeam.leaders[2].leaders[0];

  const homePassingLeader = homeTeam.leaders[0].leaders[0];
  const homeRushingLeader = homeTeam.leaders[1].leaders[0];
  const homeReceivingLeader = homeTeam.leaders[2].leaders[0];

  markdownText += `### Passing Leaders\n\n`;
  markdownText += `#### [${awayPassingLeader.athlete.displayName}](${awayPassingLeader.athlete.links[0].href}) (${awayPassingLeader.athlete.position.abbreviation}) (${awayPassingLeader.displayValue})\n\n`;
  markdownText += `#### [${homePassingLeader.athlete.displayName}](${homePassingLeader.athlete.links[0].href}) (${homePassingLeader.athlete.position.abbreviation}) (${homePassingLeader.displayValue})\n\n`;

  markdownText += `### Rushing Leaders\n\n`;
  markdownText += `#### [${awayRushingLeader.athlete.displayName}](${awayRushingLeader.athlete.links[0].href}) (${awayRushingLeader.athlete.position.abbreviation}) (${awayRushingLeader.displayValue})\n\n`;
  markdownText += `#### [${homeRushingLeader.athlete.displayName}](${homeRushingLeader.athlete.links[0].href}) (${homeRushingLeader.athlete.position.abbreviation}) (${homeRushingLeader.displayValue})\n\n`;

  markdownText += `### Receiving Leaders\n\n`;
  markdownText += `#### [${awayReceivingLeader.athlete.displayName}](${awayReceivingLeader.athlete.links[0].href}) (${awayReceivingLeader.athlete.position.abbreviation}) (${awayReceivingLeader.displayValue})\n\n`;
  markdownText += `#### [${homeReceivingLeader.athlete.displayName}](${homeReceivingLeader.athlete.links[0].href}) (${homeReceivingLeader.athlete.position.abbreviation}) (${homeReceivingLeader.displayValue})\n\n`;


  // Notes
  markdownText += `### Notes\n\n`;
  markdownText += `#### ${gameInfo.competitions[0].notes[0].headline}\n\n`;

  // Tickets
  const tickets = gameInfo.competitions[0].tickets;
  markdownText += `#### ${tickets[0].summary}`;
  markdownText += ` [Buy Tickets](${tickets[0].links[0].href})\n\n`;
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

