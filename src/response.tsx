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
    weather: Weather;
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
    notes: NotesItem[];
    status: Status;
    broadcasts: BroadcastsItem[];
    leaders: LeadersItem[];
    format: Format;
    tickets: TicketsItem[];
    startDate: string;
    geoBroadcasts: GeoBroadcastsItem[];
    odds: OddsItem[];
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
    team: Team;
    score: string;
    statistics: any[];
    records: RecordsItem[];
    leaders: LeadersItem[];
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
    rel?: string[];
    href: string;
    text?: string;
    isExternal?: boolean;
    isPremium?: boolean;
    language?: string;
    shortText?: string;
}
interface RecordsItem {
    name: string;
    abbreviation?: string;
    type: string;
    summary: string;
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
interface NotesItem {
    type: string;
    headline: string;
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
interface Format {
    regulation: Regulation;
}
interface Regulation {
    periods: number;
}
interface TicketsItem {
    summary: string;
    numberAvailable: number;
    links: LinksItem[];
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
interface OddsItem {
    provider: Provider;
    details: string;
    overUnder: number;
    spread: number;
    awayTeamOdds: AwayTeamOdds;
    homeTeamOdds: HomeTeamOdds;
    open: Open;
    current: Current;
}
interface Provider {
    id: string;
    name: string;
    priority: number;
}
interface AwayTeamOdds {
    favorite: boolean;
    underdog: boolean;
    team: Team;
}
interface HomeTeamOdds {
    favorite: boolean;
    underdog: boolean;
    team: Team;
}
interface Open {
    over: Over;
    under: Under;
    total: Total;
}
interface Over {
    value: number;
    displayValue: string;
    alternateDisplayValue: string;
}
interface Under {
    value: number;
    displayValue: string;
    alternateDisplayValue: string;
}
interface Total {
    alternateDisplayValue: string;
}
interface Current {
    over: Over;
    under: Under;
    total: Total;
}
interface Weather {
    displayValue: string;
    temperature: number;
    highTemperature: number;
    conditionId: string;
    link: Link;
}
interface Link {
    language: string;
    rel: string[];
    href: string;
    text: string;
    shortText: string;
    isExternal: boolean;
    isPremium: boolean;
}
