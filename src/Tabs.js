
import React, { useState } from "react";
import './index.css';

export default function Tabs(){
    const [tabs, setTabs] = useState([
        { id: 1, title: "Tab 1", content: "Content of Tab 1", inputValue: "" },
        { id: 2, title: "Tab 2", content: "Content of Tab 2", inputValue: "" },
        { id: 3, title: "Tab 3", content: "Content of Tab 3", inputValue: "" }
    ]);
    const [activeTab, setActiveTab] = useState(1);

    const switchTab = (id) => {
        setActiveTab(id);
    };

    const addTab = () => {
        const newTabId = tabs.length + 1;
        const newTab = {
            id: newTabId,
            title: `Tab ${newTabId}`,
            content: `Content of Tab ${newTabId}`,
            inputValue: ""
        };
        setTabs([...tabs, newTab]);
        setActiveTab(newTabId); // Set the newly added tab as active
    };

    const deleteTab = (id) => {
        const filteredTabs = tabs.filter(tab => tab.id !== id);
        setTabs(filteredTabs);
        if (activeTab === id) {
            const lastTab = filteredTabs[filteredTabs.length - 1];
            setActiveTab(lastTab.id);
        }
    };

    const handleInputChange = (id, value) => {
        const updatedTabs = tabs.map(tab =>
            tab.id === id ? { ...tab, inputValue: value } : tab
        );
        setTabs(updatedTabs);
    };

    const handleSubmit = (id) => {
        const tab = tabs.find(tab => tab.id === id);
        const url = tab.inputValue.trim(); 
        if (isValidUrl(url)) {
            
            window.location.href = url;
        } else {
            console.log(`Invalid URL entered for Tab ${id}: ${url}`);
        }
    };
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };
    return(
        <div className="container">
            <div className="box">
                <div className="tabs">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`tab ${activeTab === tab.id ? 'active-tab' : ''}`}
                            onClick={() => switchTab(tab.id)}
                        >
                            {tab.title}
                            <button onClick={(e) => {
                                e.stopPropagation();
                                deleteTab(tab.id);
                            }}>Close</button>
                        </div>
                    ))}
                    <button onClick={addTab}>Add</button>
                </div>
                <div className="contents">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`content ${activeTab === tab.id ? 'active-content' : ''}`}
                        >
                            <h1>{tab.title}</h1>
                            <p>{tab.content}</p>
                            <input
                                type="text"
                                value={tab.inputValue}
                                onChange={(e) => handleInputChange(tab.id, e.target.value)}
                            />
                            <button onClick={() => handleSubmit(tab.id)}>Submit</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
