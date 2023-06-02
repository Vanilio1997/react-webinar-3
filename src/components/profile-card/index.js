import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ProfileCard({profile,t}) {

console.log(profile);
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <div className={cn('description')}>Профиль</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{profile?.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{profile?.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{profile?.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
   profile: PropTypes.object.isRequired,
   t: PropTypes.func
};

export default memo(ProfileCard);
