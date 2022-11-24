import styled from 'styled-components';
import searchIcon from '../assets/search-icon.webp';

export default function Search({ input, setInput, setCity }) {
  function handleSubmit(e) {
    e.preventDefault();
    setCity(input);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        className="searchbar-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Zoek een stad..."
      />
      <StyledButton type="submit">
        <img
          src={searchIcon}
          width="20"
          height="20"
          alt="Een vergrootglas zoekicoon"
        />
      </StyledButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 20rem;
  height: 2rem;
  margin-bottom: 3rem;
  background-color: inherit;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  padding: .5rem .8rem;
  border: transparent;
  border-radius: 1rem;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 10px;
  border: transparent;
  background-color: inherit;
  cursor: pointer;
`;


