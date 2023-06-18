'use client'
import { useEffect, useState } from "react";
import AccountExpenditure from "./components/account-item/AccountExpenditure";
import Loader from "./components/loader";
import { ExpenditureCategory, User } from "./types/models";
import { HttpMethod, Ressource } from "./types/helpers";
import { callApi } from "./utils/api";
import CategoryExpenditureCreateForm from "./components/forms/CategoryExpenditureCreateForm";
import UserCreateForm from "./components/forms/UserCreateForm";
import ExpenditureCreateForm from "./components/forms/ExpenditureCreateForm";

export default function UserExpenditureList() {

    const [expenditureList, setExpenditureList] = useState([]);
    const [userList, setUserList] = useState({});
    const [expenditureCategoryList, setExpenditureCategoryList] = useState({});
    const [popupsStatus, setPopupsStatus] = useState({
        categoryExpenditure: false,
        user: false,
        expenditure: false,
    })

    useEffect(() => {
        // Récupération des dépenses
        fetchExpenditures();
    }, [])

    const fetchExpenditures = async () => {
        const expenditureList = await callApi(Ressource.Expenditures, HttpMethod.Get, "?fieldToOrder=date&orderType=desc");
        setExpenditureList(expenditureList);

        // Réccupération de chaque utilisateur et chaque catégory de dépense référencés dans les dépenses
        const userList: { [key: string]: User } = {};
        const categoryList: { [key: string]: ExpenditureCategory } = {};
        for (const exenditureItem of expenditureList) {
            userList[exenditureItem.userId] = await callApi(Ressource.Users, HttpMethod.Get, exenditureItem.userId)
            categoryList[exenditureItem.expenditureCategoryId] = await callApi(Ressource.ExpenditureCategories, HttpMethod.Get, exenditureItem.expenditureCategoryId)
        }

        setUserList(userList);
        setExpenditureCategoryList(categoryList);
    };

    const activePopup = (type: string, value: boolean) => {
        // Fermeture de toutes les popups
        let newPopupsStatus = {
            categoryExpenditure: false,
            user: false,
            expenditure: false,
        }

        // Ouverture / Fermeture de la popup souhaitée 
        setPopupsStatus({ ...newPopupsStatus, [type]: value })
    }

    return (
        (expenditureList.length !== 0 && Object.keys(userList).length !== 0 && Object.keys(expenditureCategoryList).length !== 0) ? (
            <div className="flex justify-center items-center flex-col mt-10 mb-28 relative">
                <div className="mb-5 w-full max-w-lg flex justify-center flex-wrap">
                    <button
                        onClick={() => activePopup("categoryExpenditure", true)}
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        + expenditure category
                    </button>
                    <button
                        onClick={() => activePopup("expenditure", true)}
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        + expenditure
                    </button>
                    <button
                        onClick={() => activePopup("user", true)}
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        + user
                    </button>
                </div>
                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl text-gray-900 dark:text-white text-center font-bold">Expenditures</h2>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {expenditureList.map(expenditureItem => (
                                <AccountExpenditure
                                    key={expenditureItem.id}
                                    fullName={`${userList[expenditureItem.userId].firstName} ${userList[expenditureItem.userId].lastName}`}
                                    category={expenditureCategoryList[expenditureItem.expenditureCategoryId].name}
                                    date={expenditureItem.date}
                                    amount={expenditureItem.amount}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
                {
                    popupsStatus.categoryExpenditure === true &&
                    <CategoryExpenditureCreateForm close={() => activePopup("categoryExpenditure", false)} />
                }
                {
                    popupsStatus.user === true &&
                    <UserCreateForm close={() => activePopup("user", false)} />
                }
                {
                    popupsStatus.expenditure === true &&
                    <ExpenditureCreateForm close={() => activePopup("expenditure", false)} reloadData={() => fetchExpenditures()} />
                }
            </div>
        ) : <Loader />
    )

}


