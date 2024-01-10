export interface ScheduleResponse {
    leagues: LeaguesItem[];
    season: Season;
    week: Week;
    events: EventsItem[];
}

export interface LeaguesItem {
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

export interface Season {
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

export interface Week {
    number: number;
}

export interface EventsItem {
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
export interface LinksItem {
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
    short: {
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