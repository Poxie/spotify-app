import React, { createContext, useContext, useState } from "react"

const initial = {
    setFeedback: (value: string, type?: 'info' | 'error') => {}
}
const FeedbackContext = createContext(initial);

export const useFeedback = () => {
    return useContext(FeedbackContext);
}

interface Props {
    children: any;
}
export const FeedbackProvider: React.FC<Props> = ({ children }) => {
    const [feedback, setFeedback] = useState<any>(null);
    const [animateOut, setAnimateOut] = useState(false);

    const animateFeedback = (value: string, type: 'info' | 'error'='info') => {
        setFeedback({feedback: value, type: type});
        setTimeout(() => {
            setAnimateOut(true);

            setTimeout(() => {
                setFeedback(null);
            }, 600);
        }, 6000);
    }

    const value = {
        setFeedback: animateFeedback
    }

    return(
        <FeedbackContext.Provider value={value}>
            {children}
            <div className="feedback-container">
                {feedback && (
                    <div className={`feedback${feedback.type ? ` ${feedback.type}` : ''}${animateOut ? ' animate-out' : ''}`}>
                        {feedback.feedback}
                    </div>
                )}
            </div>
        </FeedbackContext.Provider>
    )
}