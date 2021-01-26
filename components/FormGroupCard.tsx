import React, { FC, useState, useEffect } from "react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/FormGroupCard.module.css";

interface Props {
  groupId: number;
  title: string;
  description: string;
  updated_at: string;
  organization: string;
  isDefaultGroup: boolean;
  forms: IselectForm[];
  selectFormGroupHandler: (formGroup: any) => void;
  selectFormGroup: IselectGroupForm;
  views: number;
}

interface IselectForm {
  formId: number;
  title: string;
  description: string;
  updated_at: string;
  organization: string;
  views: number;
}

interface IselectGroupForm {
  groupId: number;
  title: string;
  description: string;
  updated_at: string;
  organization: string;
  isDefaultGroup: boolean;
  forms: IselectForm[];
  views: number;
}

const FormGroupCard: FC<Props> = ({
  groupId,
  title,
  description,
  updated_at,
  views,
  organization,
  isDefaultGroup,
  forms,
  selectFormGroupHandler,
  selectFormGroup,
}) => {
  const [formGroupCardViewClick, setFormGroupCardViewClick] = useState<boolean>(
    false
  );

  const LIGHT_GREEN = "#83cd7f";

  useEffect(() => {
    if (selectFormGroup?.groupId === groupId) {
      setFormGroupCardViewClick(true);
    } else {
      setFormGroupCardViewClick(false);
    }
  }, [selectFormGroup?.groupId, groupId]);

  return (
    <section
      className={`${styles.container} ${
        formGroupCardViewClick && styles.container__click
      }`}
      onClick={() => {
        selectFormGroupHandler({
          groupId,
          title,
          description,
          updated_at,
          views,
          organization,
          isDefaultGroup,
          forms,
        });
      }}
    >
      <FontAwesomeIcon icon={faFolder} size={"3x"} color={LIGHT_GREEN} />
      <article className={styles.title}>{title}</article>
      <section className={styles.formGroupInfo}>
        <div className={styles.formGroupInfo__description}>{description}</div>
        <div className={styles.formGroupInfo__count}>{views}+</div>
      </section>
      <div className={styles.date}>
        ({new Date(updated_at).toLocaleDateString("ko")} updated)
      </div>
    </section>
  );
};

export default FormGroupCard;