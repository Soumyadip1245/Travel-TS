import React, { ReactNode, useState } from 'react';

export type TabProps = {
    id: string;
    title: string;
    content: ReactNode;
};

export type TabsProps = {
    tabs: TabProps[];
};

const Tabs: React.FC<TabsProps> = (props) => {
    const [activeTab, setActiveTab] = useState<string>(props.tabs[0]?.id);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select tab
                </label>
                <select
                    id="tabs"
                    className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={activeTab}
                    onChange={(e) => handleTabClick(e.target.value)}
                >
                    {props.tabs.map((tab: TabProps) => (
                        <option key={tab.id} value={tab.id}>
                            {tab.title}
                        </option>
                    ))}
                </select>
            </div>

            <ul
                className="hidden sm:flex text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg dark:divide-gray-600 dark:text-gray-400 overflow-x-hidden"
                role="tablist"
            >
                {props.tabs.map((tab: TabProps) => (
                    <li key={tab.id} className="flex-grow">
                        <button
                            className={`w-full p-4 flex-grow hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-600 ${activeTab === tab.id
                                    ? "bg-gray-50 dark:bg-gray-700"
                                    : "bg-gray-50 dark:bg-gray-800"
                                }`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.title}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Tab Content */}
            <div className="border-t border-gray-200 dark:border-gray-600">
                {props.tabs.map(
                    (tab: TabProps) =>
                        activeTab === tab.id && (
                            <div
                                key={tab.id}
                                className="p-4 bg-white rounded-lg dark:bg-gray-800 w-full"
                            >
                                {tab.content}
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default Tabs;
