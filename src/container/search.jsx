import React, { useState } from 'react';
import axios from 'axios';
import { Col, Container, Form, Row } from 'reactstrap';

function Search() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const disabled = value.length === 0;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/v1/romans', {
        number: value,
      });
      setResults(data.data);
      setValue('');
      setLoading(false);
    } catch ({ response }) {
      if (response.status === 400) {
        const { message } = response.data;
        setResults(message);
        setLoading(false);
        setValue('');
      } else if (response.status === 404) {
        setResults('The number is not found');
        setLoading(false);
        setValue('');
      }
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md='auto'>
          <h1>Get roman numerical</h1>
          <Form onSubmit={handleSearch}>
            <input
              type='text'
              name='number'
              value={value}
              onChange={handleChange}
              placeholder='Type a number'
            />
            <button
              type='submit'
              disabled={disabled}
              className='btn btn-success'
            >
              Get
            </button>
          </Form>
          {loading === true && results === '' ? (
            <div>Loading...</div>
          ) : (
            <div>{results}</div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
