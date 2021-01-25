import React, { useState } from "react";
import styles from "../styles/Form.module.css";
import FormCard from "../components/FormCard";
import FormDescription from "../components/FormDescription";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../components/SearchBar";

import { useSelector, useDispatch } from "react-redux";
import { IReducerState } from "../reducers";
import { Iuser } from "../containers/UserProfile";
import HomeFormCard from "../components/HomeFormCard";
import {
  FORM_LIST_REQUEST,
  IFormReducerState,
  FORM_GROUP_REQUEST,
} from "../reducers/form";
import HomeFormGroupCard from "../components/HomeFormGroupCard";
import { GET_USER_REQUEST } from "../reducers/user";
import { isNull } from "util";

const Form = () => {
  const MEDIUM_GRAY = "#bfbfbf";

  const dispatch = useDispatch();
  const userInfo = useSelector<IReducerState, Iuser>((state) => state.user.me);
  const { formList, formTotalNumber } = useSelector<
    IReducerState,
    IFormReducerState
  >((state) => state.form);

  const [Page, setPage] = useState<number>(1);
  const [Sort, setSort] = useState<string | null>(null);
  const [Query, setQuery] = useState<string>("");
  const [SelectForm, setSelectForm] = useState<any[]>([]);

  const renderFormCard = () =>
    formList.map((form, index) => (
      <FormCard
        {...form}
        key={index}
        page={Page}
        selectForm={SelectForm}
        selectFormHandler={onSelectFormHandler}
        number={index + 1}
      />
    ));

  const onChangePageUpHandler = () => {
    const params = {
      page: Page + 1,
      sort: Sort,
      query: Query,
    };

    dispatch({
      type: FORM_LIST_REQUEST,
      data: params,
    });

    setPage(Page + 1);
  };

  const onChangePageDownHandler = () => {
    if (Page === 1) {
      window.alert("현재 1 페이지에 있습니다.");
      return;
    } else {
      const params = {
        page: Page - 1,
        sort: Sort,
        query: Query,
      };

      dispatch({
        type: FORM_LIST_REQUEST,
        data: params,
      });

      setPage(Page - 1);
    }
  };

  const onChangeSortPopularHandler = () => {
    const params = {
      page: Page,
      sort: "popular",
      query: Query,
    };

    dispatch({
      type: FORM_LIST_REQUEST,
      data: params,
    });

    setSort("popular");
  };

  const onChangeSortLatestHandler = () => {
    const params = {
      page: Page,
      sort: null,
      query: Query,
    };

    dispatch({
      type: FORM_LIST_REQUEST,
      data: params,
    });

    setSort(null);
  };

  //타입 다시 지정.
  const onSelectFormHandler = (formArr: any[]): void => {
    setSelectForm(formArr);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles.header__title}>Form</div>
          <div className={styles.header__sort}>
            <div onClick={onChangeSortLatestHandler}>최신순</div>
            <div> ｜ </div>
            <div onClick={onChangeSortPopularHandler}>인기순</div>
          </div>
        </div>
        <SearchBar setQuery={setQuery} />
      </header>
      <div className={styles.subHeader}>
        <div className={styles.subHeader__desc}>
          * 원하는 폼을 클릭 시, 최대 10개의 폼 목록을 한 번에 작성할 수 있어요.
        </div>
        <div className={styles.subHeader__number}>(총 {formTotalNumber}개)</div>
      </div>
      <div className={styles.form}>
        <div className={styles.cheveronLeft} onClick={onChangePageDownHandler}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={"1x"}
            color={MEDIUM_GRAY}
          />
        </div>
        <div className={styles.formCard}>{renderFormCard()}</div>
        <div className={styles.cheveronRight} onClick={onChangePageUpHandler}>
          <FontAwesomeIcon
            icon={faChevronRight}
            size={"1x"}
            color={MEDIUM_GRAY}
          />
        </div>
      </div>
      <FormDescription selectForm={SelectForm} />
    </div>
  );
};

interface IFormList {
  q?: string;
  page: number;
  sort?: string;
}

const formRequest: IFormList = {
  page: 1,
};

Form.getInitialProps = async (context) => {
  // const state = context.store.getState();
  // 이 직전에 LOAD_USERS_REQUEST
  context.store.dispatch({
    type: FORM_LIST_REQUEST,
    data: formRequest,
  });

  context.store.dispatch({
    type: GET_USER_REQUEST,
  });
};

export default Form;
