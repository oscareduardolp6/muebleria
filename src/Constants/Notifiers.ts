import { Notifier } from '../Types/Notifier'
import { BulmaToastNotifier } from './../Classes/BulmaToastNotifier'

export const alerter: Notifier = new BulmaToastNotifier()