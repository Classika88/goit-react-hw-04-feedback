import React, { useState } from 'react';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { Statistic } from './Statistic/Statistic';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = e => {
    const { name } = e.target;
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return Object.values({ good, neutral, bad }).reduce(
      (acc, item) => acc + item,
      0
    );
  };

  const countPositiveFeedbackPercentage = () => {
    return good ? Math.ceil((good / (good + neutral + bad)) * 100) : 0;
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={onLeaveFeedback}
          options={Object.keys({ good, neutral, bad })}
        />
      </Section>
      <Section title="Statistics:">
        {countTotalFeedback() ? (
          <Statistic
            className="feedback-title"
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};
