import PropTypes from 'prop-types';

function TitleAuth({ title }) {
    return (
        <h1 className="font-bold text-3xl text-Grey-900 mb-5" >{title}</h1>
    )
}

TitleAuth.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TitleAuth
