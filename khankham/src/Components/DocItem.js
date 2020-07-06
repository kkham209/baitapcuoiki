import React, { Component } from 'react';
import styled from 'styled-components';
import { FaCheck, FaUndo, FaTrash } from 'react-icons/fa';

export default class DocItem extends Component {
  state = {
    textdoc: this.props.doc.name,
    isEdit: false,
  };
  handleCompleteOrUndo = () => {
    this.props.setCompleted(this.props.doc._id);
  };
  handleDelete = () => {
    this.props.deleteItem(this.props.doc._id);
  };
  handleOnEditing = () => {
    this.setState({ isEdit: true });
  };
  handleChangeText = (event) => {
    this.setState({ textdoc: event.target.value });
  };

  render() {
    const { doc } = this.props;
    let handleEdit = () => {
      this.props.editdoc(this.state.textdoc, doc._id);
      this.setState({ isEdit: false });
    };
    return (
      <TaskWrapper>
        {!this.state.isEdit ? (
          <docLable onDoubleClick={this.handleOnEditing}> {doc.name} </docLable>
        ) : (
          <InputEdit
            value={this.state.textdoc}
            onChange={this.handleChangeText}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleEdit();
                console.log('xxxx', this.state.textdoc);
              }
            }}
          ></InputEdit>
        )}
        <CustomButton onClick={this.handleCompleteOrUndo}>
          {this.props.completed ? <FaUndo /> : <FaCheck />}
        </CustomButton>
        <CustomButton onClick={this.handleDelete}>
          {this.props.completed ? <FaTrash /> : ''}
        </CustomButton>
      </TaskWrapper>
    );
  }
}

const TaskWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background: #c4c4c4;
  width: min(90%, 350px);
  min-height: 50px;
`;
const docLable = styled.label`
  width: 100%;
  max-width: 80%;
  margin-right: auto;
  margin-left: 4px;
  line-height: 1rem;
  border: none;
`;
const CustomButton = styled.button`
  background: yellow;
  width: 40px;
  height: 40px;
  color: ${(props) => (props.delete ? 'red' : 'blue')};
  font-size: 1.2rem;
  margin-right: 4px;
  cursor: pointer;
  background: transparent;
  &:hover {
    opacity: 0.8;
  }
  border: none;
  &:focus {
    outline: none;
  }
`;
const InputEdit = styled.input`
  width: 100%;
  max-width: 80%;
  border: none;
  margin-right: auto;
  margin-left: 4px;
  line-height: 2rem;
`;
