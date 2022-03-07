import React, { FC } from 'react'
import { Button, Form, Radio, Selector, Space, Stepper, Switch } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { ITransportationRequestForm } from '../../../../common/interfaces'
import { BaggageOption } from '../../../../common/enums'
import { LOCALE_MAP } from '../../../../common/components'
import styles from './styles.module.less'


export interface IFormProps {
  onSubmit: (data: ITransportationRequestForm) => void
  onCancel: () => void
}

export const FormComponent: FC<IFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation()

  return (
    <div className={ styles.wrapper }>
      <Form
        onFinish={ onSubmit }
        footer={
          <Space
            block
            direction="vertical"
          >
            <Button
              block
              type="submit"
              color="primary"
              size="large"
            >
              { t('requestsFind') }
            </Button>
            <Button
              block
              onClick={ onCancel }
              color="danger"
              size="large"
            >
              { t('cancel') }
            </Button>
          </Space>
        }
      >
        <Form.Header>{ t('requestsFind') }</Form.Header>
        <Form.Item
          name="languages"
          label={ t('myLanguages') }
          initialValue={ ['pl'] }
        >
          <Selector
            multiple={ true }
            options={ Object.entries(LOCALE_MAP).map(([value, label]) => ({ label, value })) }
          />
        </Form.Item>
        <Form.Item
          name="peopleCount"
          label={ t('seatsInMyCar') }
          initialValue={ 1 }
        >
          <Stepper min={ 0 } />
        </Form.Item>
        <Form.Item
          name="withPets"
          label={ t('allowPets') }
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="withBaggage"
          label={ t('luggage') }
          initialValue={ BaggageOption.SMALL_CAR }
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={ BaggageOption.SMALL_CAR }>{ t('iHavePassengerCar') }</Radio>
              <Radio value={ BaggageOption.BIG_CAR }>{ t('iHaveLargeCarOrBus') }</Radio>
              <Radio value={ BaggageOption.TRUCK }>{ t('iHaveTruck') }</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>

    </div>
  )
}

export { FormComponent as Form }
