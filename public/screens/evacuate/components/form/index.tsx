import React, { FC } from 'react'
import { Button, Form, Selector, Stepper, Switch, TextArea, Radio, Space } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { IEvacuationRequestForm } from '../../../../common/interfaces'
import { BaggageOption } from '../../../../common/enums'
import styles from './styles.module.less'


export interface IFormProps {
  onSubmit: (data: IEvacuationRequestForm) => void
}

export const FormComponent: FC<IFormProps> = ({
  onSubmit
}) => {
  const { t } = useTranslation()

  return (
    <div className={ styles.wrapper }>
      <Form
        onFinish={ (data) => {
          onSubmit({
            ...data,
            languages: data.languages.join('')
          })
        } }
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
          >
            { t('request_add') }
          </Button>
        }
      >
        <Form.Header>{ t('request_add') }</Form.Header>
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
          label={ t('peopleCountRefugee') }
          initialValue={ 1 }
        >
          <Stepper min={ 1 } />
        </Form.Item>
        <Form.Item
          name="withPets"
          label={ t('withPetsRefugee') }
          initialValue={ false }
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="withBaggage"
          label="Наш багаж:"
          initialValue={ BaggageOption.SMALL_CAR }
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={ BaggageOption.SMALL_CAR }>Немного</Radio>
              <Radio value={ BaggageOption.BIG_CAR }>Нужна машина побольше</Radio>
              <Radio value={ BaggageOption.TRUCK }>Нужен грузовик (доставка)</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="contactData"
          label="Методы связи со мной (и любая другая информация):"
          initialValue=""
        >
          <TextArea
            placeholder="Сюда необходимо вписать ваш номер телефона, аккаунты в месенджерах - все что может быть использованно для связи с вами"
            rows={ 4 }
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export { FormComponent as Form }
