import React, { FC, useState } from 'react'
import { Button, Form, Radio, Selector, Slider, Space, Stepper, Switch } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { ISearchInRadiusRequestForm } from '../../../../common/interfaces'
import { BaggageOption } from '../../../../common/enums'
import styles from './styles.module.less'


export interface IFormProps {
  isActive: boolean
  onSubmit: (data: ISearchInRadiusRequestForm) => void
  onCancel: () => void
}

export const FormComponent: FC<IFormProps> = ({
  isActive,
  onSubmit,
  onCancel,
}) => {
  const DEFAULT_RADIUS = 40
  const { t } = useTranslation()
  const [radius, setRadius] = useState(DEFAULT_RADIUS)

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
              loading={ !isActive }
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
          name="radius"
          label={ t('radiusInKm', { replace: { radius } }) }
          initialValue={ DEFAULT_RADIUS }
        >
          <Slider
            min={ 20 }
            max={ 200 }
            onChange={ (value) => setRadius(value as number) }
          />
        </Form.Item>
        <Form.Item
          name="languages"
          label={ t('myLanguages') }
          initialValue={ ['pl'] }
        >
          <Selector
            multiple={ true }
            options={[
              {
                label: <>Polski</>,
                value: 'pl',
              },
              {
                label: <>Українськa</>,
                value: 'uk',
              },
              {
                label: <>English</>,
                value: 'en',
              },
              {
                label: <>Русский</>,
                value: 'ru',
              },
            ]}
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
