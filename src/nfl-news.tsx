import { ActionPanel, List, Action, Detail } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { NewsResponse } from "./model/news-response";

const datePublished = (date: string) => {
  /**
   * Format the date to a readable format
   * @param date - The date to format
   * @returns
   * @example
   * datePublished(date)
   *
   */

  const dateObj = new Date(date);
  return dateObj.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export default function Command() {
  const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/news`;
  const { isLoading, data } = useFetch(url) as {
    isLoading: boolean;
    data: NewsResponse;
  };

  if (isLoading) {
    return <List isLoading={true} />;
  }

  // Lists the news articles
  return (
    <List isLoading={isLoading}>
      {data.articles.map((article) => (
        <List.Item
          key={article.dataSourceIdentifier}
          title={article.headline}
          icon={article.images[0].url}
          // accessories={article.published ? [{ tag: datePublished(article.published) }] : []}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Open in Browser" url={article.links.web.href} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
