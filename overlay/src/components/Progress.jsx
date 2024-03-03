import { Trans } from 'react-i18next';
import classNames from 'classnames';
import MoneyDisplay from './MoneyDisplay';
import ProgressBar from './ProgressBar';
import React from 'react';

const Progress = ({ amountRaised, areCentsVisible, isPlural, fundraisingGoal, moneyFormat, progressFormat }) => {
    const raised = (
        <MoneyDisplay
            amount={amountRaised}
            areCentsVisible={areCentsVisible}
            format={moneyFormat}
        />
    );

    let goal;
    if (progressFormat !== 'raisedOnly') {
        goal = (
            <MoneyDisplay
                amount={fundraisingGoal}
                areCentsVisible={areCentsVisible}
                format={moneyFormat}
            />
        );
    }

    if (progressFormat === 'raisedOnly') {
        return (
            <div
                className={
                    classNames(
                        'leading-none font-cantarell text-helper3 whitespace-nowrap',
                        moneyFormat === 'fancy' ? 'text-[62px]' : 'text-[54px]',
                    )
                }
            >
                {raised}
            </div>
        );
    }

    if (progressFormat === 'raisedAndGoal') {
        return (
            <div
                className={
                    classNames(
                        'flex space-x-2 leading-none font-cantarell text-helper3 whitespace-nowrap mt-1',
                        moneyFormat === 'fancy' ? 'text-[44px]' : 'text-[38px]',
                    )
                }
            >
                {raised}
                <div>/</div>
                {goal}
            </div>
        );
    }

    if (progressFormat === 'progressBar') {
        const percentRaised = Math.floor(amountRaised / fundraisingGoal * 100);

        let raisedLangKey = isPlural ? 'OUR_PERCENT_RAISED' : 'MY_PERCENT_RAISED';
        if (percentRaised >= 1) {
            raisedLangKey += '_EXCITED';
        }

        return (
            <div className='flex flex-col mt-2 text-[28px] w-full font-cantarell leading-none'>
                <div className='flex mb-2 text-helper3'>
                    <div className='w-1/2'>
                        {raised}
                    </div>
                    <div className='w-1/2 flex justify-end'>
                        {goal}
                    </div>
                </div>
                <ProgressBar
                    current={amountRaised}
                    required={fundraisingGoal}
                    backColor='bg-helper5'
                    fillColor='bg-helper4'
                />
                <div
                    className={
                        `text-[16px] font-cantarell text-helper3 whitespace-nowrap leading-none mt-2
                        text-center animate-pop-in animate-delay-[1.2s]`
                    }
                >
                    <Trans
                        i18nKey={raisedLangKey}
                        values={{
                            percent: percentRaised,
                        }}
                    />
                </div>
            </div>
        );
    }
};

export default React.memo(Progress);
