import styles from '@styles/pages/Job/components/TabbedJobList.module.scss'
import { JobList } from '@pages/Job/components/JobList'

const TABS_MAP = {
    GRAB_SHOBEL: 'grabShobel',
    EXTERNAL: 'external',
}

const TabbedJobList = ({
    internalJobs,
    externalJobs,
    activeTab,
    handleTabClick,
}) => {
    return (
        <div className={styles.tabsSection}>
            <div className={styles.tabsContainer}>
                <button
                    className={
                        activeTab === TABS_MAP.GRAB_SHOBEL
                            ? styles.activeTab
                            : styles.tab
                    }
                    onClick={() => handleTabClick(TABS_MAP.GRAB_SHOBEL)}
                >
                    GrabShobel Jobs ({internalJobs.length})
                </button>
                <button
                    className={
                        activeTab === TABS_MAP.EXTERNAL
                            ? styles.activeTab
                            : styles.tab
                    }
                    onClick={() => handleTabClick(TABS_MAP.EXTERNAL)}
                >
                    External Jobs ({externalJobs.length})
                </button>
            </div>
            <div className={styles.jobsContainerTabs}>
                <JobList
                    className={`${styles.internalJobsTab} ${
                        activeTab === TABS_MAP.GRAB_SHOBEL ? styles.active : ''
                    }`}
                    jobs={internalJobs}
                    canEdit
                />
                <JobList
                    className={`${styles.externalJobTab} ${
                        activeTab === TABS_MAP.EXTERNAL ? styles.active : ''
                    }`}
                    jobs={externalJobs}
                />
            </div>
        </div>
    )
}

export { TabbedJobList }
