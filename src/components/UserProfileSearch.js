import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { GoOrganization, GoPeople, GoPersonAdd, GoRepo, GoLink, GoLocation, GoMail, GoBrowser, GoMention } from 'react-icons/go';
import './UserProfileSearch.css';

const UserProfileSearch = () => {
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserProfile(response.data);
    }
    catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
      setErrorMessage('User not found. Please check the username.');
    }
  };

  return (
    <>
      <div className='search-bar'>
        <div className='search'>
          <FiSearch />
          <input
            type='text'
            placeholder='Enter GitHub username'
            className='search-input'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button onClick={fetchUserProfile}>Search</button>
      </div>

      {userProfile ? (<section>
        {userProfile && (
          <div className='card-section'>
            <div className='user-info-container'>
              <span className='user-type'>{userProfile.type}</span>
              <small className='user-created'>Created at: {userProfile.created_at.slice(0, 10)}</small>
              <div className='user-info'>
                <img src={userProfile.avatar_url} alt="" />
                <div className='user-name'>
                  <h2 className='user-h2-tag'>{userProfile.name}</h2>
                  <div className='user-additional'>
                    <a href={userProfile.html_url} target='__blank' className='user-login user-p-tag'><GoMention />{userProfile.login} <GoBrowser className='user-browser' /></a>
                  </div>
                </div>
              </div>
              <p className='user-p-tag'>{userProfile.bio}</p>
              <div className='user-additional-container'>
                <div className='user-additional'>
                  <GoOrganization />
                  <p>{userProfile.company !== null ? (<p>{userProfile.company}</p>) : 'Not Mentioned'}</p>
                </div>
                <div className="user-additional">
                  <GoLocation />
                  <p>{userProfile.location !== null ? (<p>{userProfile.location}</p>) : 'Not Mentioned'}</p>
                </div>
                <div className="user-additional">
                  <GoLink />
                  <p>{userProfile.blog !== '' ? (<a href={userProfile.blog} target='__blank'>{userProfile.blog.replace(/https?:\/\//, '')}</a>) : ('Not Mentioned')}</p>
                </div>
                <div className="user-additional">
                  <GoMail />
                  <p>{userProfile.email !== null ? (<p>{userProfile.email}</p>) : ('Not Mentioned')}</p>
                </div>

              </div>
            </div>

            <div className='user-cells-container'>
              {/* Followers */}
              <div className='user-cell'>
                <div className='cell-icons'>
                  <GoPeople />
                </div>
                <div className='user-cell-titles'>
                  <h3>{userProfile.followers}</h3>
                  <p className='user-p-tag'>Followers</p>
                </div>
              </div>
              {/* Following */}
              <div className='user-cell'>
                <div className='cell-icons'>
                  <GoPersonAdd />
                </div>
                <div className='user-cell-titles'>
                  <h3>{userProfile.following}</h3>
                  <p className='user-p-tag'>Following</p>
                </div>
              </div>
              {/* Repo */}
              <div className='user-cell'>
                <div className='cell-icons'>
                  <GoRepo />
                </div>
                <div className='user-cell-titles'>
                  <h3>{userProfile.public_repos}</h3>
                  <p className='user-p-tag'>Repositories</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>) : (
        <p className='warning'>{errorMessage || 'Find GitHub Profiles'}</p>)}
    </>
  );
};

export default UserProfileSearch