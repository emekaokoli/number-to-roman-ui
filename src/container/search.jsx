import React, { useState } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Col, Container, Form, Row } from 'reactstrap';

function Search() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const temp = [];

  const disabled = value.length === 0;
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchEventSource(
      `http://localhost:1337/api/v1/roman?number=${value}`,
      {
        method: 'GET',
        headers: {
          Accept: 'text/event-stream',
        },
        onopen(res) {
          if (
            // eslint-disable-linebreak-line no-undef
            res.ok && res.headers.get('content-type') === 'text/event-stream'
          ) {
            setLoading(true);
          } else {
            temp.push({ romanNumber: res.statusText, id: res.status });
            setResults([...temp]);
            setValue('');
          }
        },
        onmessage(event) {
          const parsedData = JSON.parse(event.data);
          temp.push(parsedData);
          setResults([...temp]);
          setValue('');
          setLoading(false);
        },
        onclose() {
          return 'Connection closed';
        },
        onerror(err) {
          if (err instanceof Error) {
            throw err;
          }
        },
      },
    );
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
          {loading === true && results === [] ? (
            <div>Loading...</div>
          ) : (
            <div>
              {results?.map(({ id, romanNumber }) => (
                <p key={id}>{romanNumber}</p>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
