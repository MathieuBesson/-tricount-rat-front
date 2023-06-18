'use client'
import { useEffect, useState } from "react";
import AccountBalance from "../components/account-item/AccountBalance";
import { callApi } from "../utils/api";
import { HttpMethod, Ressource } from "../types/helpers";
import { User } from "../types/models";
import Loader from "../components/loader";

export default function AccountingBalance() {
    const [userExpenditureSumList, setUserExpenditureSumList] = useState([]);
    const [userList, setUserList] = useState({});
    const [totalSpent, setTotalSpent] = useState(-1);
    const [spendAverage, setSpendAverage] = useState(-1);

    useEffect(() => {
        // Récupération de la somme des dépenses par utilisateur
        fetchExpenditureSumList();
    }, [])

    const fetchExpenditureSumList = async () => {
        const userExpenditureSumFetchedList = await callApi(Ressource.ExpenditureUser, HttpMethod.Get);
        setUserExpenditureSumList(userExpenditureSumFetchedList);

        // Récupération des utilisateurs liés au dépenses
        const userListFetched: { [key: string]: User } = {};
        let totalSpentFetched = 0;
        for (const userExpenditureSumItem of userExpenditureSumFetchedList) {
            userListFetched[userExpenditureSumItem.userId] = await callApi(Ressource.Users, HttpMethod.Get, userExpenditureSumItem.userId);
            totalSpentFetched += userExpenditureSumItem._sum.amount
        }

        // Calcul de la moyenne des dépenses
        const spendAverageFetched = Math.round(totalSpentFetched / userExpenditureSumFetchedList.length)
        setUserList(userListFetched);
        setTotalSpent(totalSpentFetched);
        setSpendAverage(spendAverageFetched);

        // Calcul des sommes dues par user
        for (const userExpenditureSumItem of userExpenditureSumFetchedList) {
            userExpenditureSumItem.balance = userExpenditureSumItem._sum.amount - spendAverageFetched
        }

        setUserExpenditureSumList(userExpenditureSumFetchedList);
    };

    return (
        (userExpenditureSumList.length !== 0 && Object.keys(userList).length !== 0 && totalSpent > -1 && spendAverage > -1) ? (
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center justify-between mb-4">
                        <h2 className="text-2xl text-gray-900 dark:text-white text-center font-bold">Accounting balance</h2>
                        <h3 className="text-xl text-gray-900 dark:text-white text-center mt-5">Total spend : <span className="font-bold">{totalSpent}€</span></h3>
                        <h3 className="text-xl text-gray-900 dark:text-white text-center mt-5">User average : <span className="font-bold">{spendAverage}€</span></h3>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {userExpenditureSumList.map((userExpenditureSumItem, id) => (
                                <AccountBalance
                                    key={id}
                                    fullName={`${userList[userExpenditureSumItem.userId].firstName} ${userList[userExpenditureSumItem.userId].lastName}`}
                                    amount={userExpenditureSumItem._sum.amount}
                                    balance={userExpenditureSumItem.balance}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        ) : <Loader />
    )
}


