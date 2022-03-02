import React, { FC } from 'react'
import { Button, Form, Radio, Selector, Space, Stepper, Switch } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { ITransportationRequestForm } from '../../../../common/interfaces'
import { BaggageOption } from '../../../../common/enums'
import styles from './styles.module.less'


export interface IFormProps {
  onSubmit: (data: ITransportationRequestForm) => void
}

export const FormComponent: FC<IFormProps> = ({
  onSubmit
}) => {
  const { t } = useTranslation()

  return (
    <div className={ styles.wrapper }>
      <Form
        onFinish={ onSubmit }
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
          >
            { t('requests_find') }
          </Button>
        }
      >
        <Form.Header>{ t('requests_find') }</Form.Header>
        <Form.Item
          name="languages"
          label={ t('my_languages') }
          initialValue={ ['PL'] }
        >
          <Selector
            multiple={ true }
            options={[
              {
                label: <>PL</>,
                value: 'PL',
              },
              {
                label: <>UA</>,
                value: 'UA',
              },
              {
                label: <>EN</>,
                value: 'EN',
              },
              {
                label: <>RU</>,
                value: 'RU',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="peopleCount"
          label="Мест в моей машине:"
          initialValue={ 1 }
        >
          <Stepper min={ 1 } />
        </Form.Item>
        <Form.Item
          name="withPets"
          label="Я не против домашних животных:"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="withBaggage"
          label="У меня есть место для багажа:"
          initialValue={ BaggageOption.SMALL_CAR }
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={ BaggageOption.SMALL_CAR }>У меня обычная легковая машина</Radio>
              <Radio value={ BaggageOption.BIG_CAR }>У меня большая машина</Radio>
              <Radio value={ BaggageOption.TRUCK }>У меня грузовик (показать только доставки)</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>

    </div>
  )
}

export { FormComponent as Form }
