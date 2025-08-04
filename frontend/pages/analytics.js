import { useEffect, useState } from "react";
import { fetchAnalytics, openAnalyticsDashboard } from "../utils/api";
import styles from "../styles/Home.module.css";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const data = await fetchAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("❌ Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    getAnalytics();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1>📊 Lecture Analytics</h1>
      </header>

      {loading ? (
        <p>⏳ Loading analytics...</p>
      ) : analytics ? (
        <div className={styles.card}>
          <h2>📈 Analytics Overview</h2>
          <ul>
            <li>✅ Total Videos Processed: {analytics.total_videos || 0}</li>
            <li>📝 Total Summaries Generated: {analytics.total_summaries || 0}</li>
            <li>🎯 Total Quizzes Created: {analytics.total_quizzes || 0}</li>
            <li>📂 Most Recent Video: {analytics.recent_video || "N/A"}</li>
          </ul>
          <button className={styles.secondaryBtn} onClick={openAnalyticsDashboard}>
            🔍 Open Interactive Dashboard
          </button>
        </div>
      ) : (
        <p>⚠️ No analytics data found. Process some videos first!</p>
      )}
    </div>
  );
}
