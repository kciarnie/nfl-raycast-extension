import { ActionPanel, List, Action, Color, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";

interface ScheduleResponse {
  leagues: LeaguesItem[];
  season: Season;
  week: Week;
  events: EventsItem[];
}

interface LeaguesItem {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  slug: string;
  season: Season;
  logos: LogosItem[];
  calendarType: string;
  calendarIsWhitelist: boolean;
  calendarStartDate: string;
  calendarEndDate: string;
  calendar: CalendarItem[];
}

interface Season {
  year: number;
  startDate?: string;
  endDate?: string;
  displayName?: string;
  type: Type | number;
  slug?: string;
}

interface Type {
  id: string;
  type?: number;
  name?: string;
  abbreviation?: string;
  state?: string;
  completed?: boolean;
  description?: string;
  detail?: string;
  shortDetail?: string;
  shortName?: string;
}

interface LogosItem {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel: string[];
  lastUpdated: string;
}

interface CalendarItem {
  label: string;
  value: string;
  startDate: string;
  endDate: string;
  entries: EntriesItem[];
}

interface EntriesItem {
  label: string;
  alternateLabel: string;
  detail: string;
  value: string;
  startDate: string;
  endDate: string;
}

interface Week {
  number: number;
}

interface EventsItem {
  id: string;
  uid: string;
  date: string;
  name: string;
  shortName: string;
  season: Season;
  week: Week;
  competitions: CompetitionsItem[];
  links: LinksItem[];
  status: Status;
}

interface CompetitionsItem {
  id: string;
  uid: string;
  date: string;
  attendance: number;
  type: Type;
  timeValid: boolean;
  neutralSite: boolean;
  conferenceCompetition: boolean;
  playByPlayAvailable: boolean;
  recent: boolean;
  venue: Venue;
  competitors: CompetitorsItem[];
  notes: any[];
  status: Status;
  broadcasts: BroadcastsItem[];
  leaders: LeadersItem[];
  format: Format;
  startDate: string;
  geoBroadcasts: GeoBroadcastsItem[];
  headlines: HeadlinesItem[];
}
interface Venue {
  id: string;
  fullName?: string;
  address?: Address;
  capacity?: number;
  indoor?: boolean;
}
interface Address {
  city: string;
  state: string;
}
interface CompetitorsItem {
  id: string;
  uid: string;
  type: string;
  order: number;
  homeAway: string;
  winner: boolean;
  team: Team;
  score: string;
  linescores: LinescoresItem[];
  statistics: any[];
  records: RecordsItem[];
}
interface Team {
  id: string;
  uid?: string;
  location?: string;
  name?: string;
  abbreviation?: string;
  displayName?: string;
  shortDisplayName?: string;
  color?: string;
  alternateColor?: string;
  isActive?: boolean;
  venue?: Venue;
  links?: LinksItem[];
  logo?: string;
}
interface LinksItem {
  rel: string[];
  href: string;
  text?: string;
  isExternal?: boolean;
  isPremium?: boolean;
  language?: string;
  shortText?: string;
}
interface LinescoresItem {
  value: number;
}
interface RecordsItem {
  name: string;
  abbreviation?: string;
  type: string;
  summary: string;
}
interface Status {
  clock: number;
  displayClock: string;
  period: number;
  type: Type;
}
interface BroadcastsItem {
  market: string;
  names: string[];
}
interface LeadersItem {
  name?: string;
  displayName?: string;
  shortDisplayName?: string;
  abbreviation?: string;
  leaders?: LeadersItem[];
  displayValue?: string;
  value?: number;
  athlete?: Athlete;
  team?: Team;
}
interface Athlete {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  links: LinksItem[];
  headshot: string;
  jersey: string;
  position: Position;
  team: Team;
  active: boolean;
}
interface Position {
  abbreviation: string;
}
interface Format {
  regulation: Regulation;
}
interface Regulation {
  periods: number;
}
interface GeoBroadcastsItem {
  type: Type;
  market: Market;
  media: Media;
  lang: string;
  region: string;
}
interface Market {
  id: string;
  type: string;
}
interface Media {
  shortName: string;
}
interface HeadlinesItem {
  description: string;
  type: string;
  shortLinkText: string;
  video?: VideoItem[];
}
interface VideoItem {
  id: number;
  source: string;
  headline: string;
  thumbnail: string;
  duration: number;
  tracking: Tracking;
  deviceRestrictions: DeviceRestrictions;
  links: Links;
}
interface Tracking {
  sportName: string;
  leagueName: string;
  coverageType: string;
  trackingName: string;
  trackingId: string;
}
interface DeviceRestrictions {
  type: string;
  devices: string[];
}
interface Links {
  api: Api;
  web: Web;
  source: Source;
  mobile: Mobile;
}
interface Api {
  self: Self;
  artwork: Artwork;
}
interface Self {
  href: string;
}
interface Artwork {
  href: string;
}
interface Web {
  href: string;
  'short': {
    href: string;
  };
  self: Self;
}
interface Source {
  mezzanine?: Mezzanine;
  flash?: Flash;
  hds?: Hds;
  HLS?: HLS;
  HD?: HD;
  full?: Full;
  href: string;
}
interface Mezzanine {
  href: string;
}
interface Flash {
  href: string;
}
interface Hds {
  href: string;
}
interface HLS {
  href: string;
  HD: HD;
}
interface HD {
  href: string;
}
interface Full {
  href: string;
}
interface Mobile {
  alert: Alert;
  source: Source;
  href: string;
  streaming: Streaming;
  progressiveDownload: ProgressiveDownload;
}
interface Alert {
  href: string;
}
interface Streaming {
  href: string;
}
interface ProgressiveDownload {
  href: string;
}

// function formatGameToMarkdown(gameInfo: Game) {
//   console.log(gameInfo);
//   let markdownText = ``;
//   markdownText += `## ![Away Team Logo](${gameInfo.awayTeam.logo}?raycast-width=25&raycast-height=25) ${gameInfo.awayTeam.placeName.default} (${gameInfo.awayTeam.abbrev}) @  ${gameInfo.homeTeam.placeName.default} (${gameInfo.homeTeam.abbrev}) ![Home Team Logo](${gameInfo.homeTeam.logo}?raycast-width=25&raycast-height=25)\n\n`;
//   markdownText += `**Venue:** ${gameInfo.venue.default}\n`;

//   markdownText += `### Broadcasting Networks\n\n`;
//   gameInfo.tvBroadcasts.forEach((broadcast: TVBroadcast) => {
//     markdownText += `- **${broadcast.network}** (${broadcast.market}, ${broadcast.countryCode})\n`;
//   });

//   markdownText += `\n### Useful Links\n\n`;
//   markdownText += `[Buy Tickets](${gameInfo.ticketsLink})\n`;
//   markdownText += `\n[NHL Game Center Link](https://www.nhl.com${gameInfo.gameCenterLink})\n`;
//   markdownText += `\n[Away Team Radio Broadcast](${gameInfo.awayTeam.radioLink})\n`;
//   markdownText += `\n[Home Team Radio Broadcast](${gameInfo.homeTeam.radioLink})\n`;

//   return markdownText;
// }

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

  return (
    <List isLoading={isLoading}>
      {data && (data.events || []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event: EventsItem) => (
        /// List Item for each event
        < List.Item key={event.id}
          title={event.name}
          subtitle={event.shortName}
          accessories={
            [
              // If the game happened, display the score, make it a tag and show it like 
              event.status.type.completed ?
                {
                  tag: {
                    value:
                      "FINAL " + event.competitions[0].competitors[0].score + "-" +
                      event.competitions[0].competitors[1].score, color: Color.PrimaryText
                  }
                } : {},
              // time options for the game 
              { text: { value: new Date(event.date).toLocaleTimeString([], timeOptions), color: Color.PrimaryText } },
              // Date options for the game
              { text: { value: new Date(event.date).toLocaleDateString([], dateOption), color: Color.PrimaryText } },
              /// Away Team Logo
              { icon: event.competitions[0].competitors[1].team.logo },
              /// VS
              { text: { value: "vs", color: Color.PrimaryText } },
              /// Home Team Logo
              { icon: event.competitions[0].competitors[0].team.logo },
            ]}
        />
      ))
      }
      <List.EmptyView icon={{ source: "sad-puck.png" }} title="Something went wrong" />
    </List >
  );
}