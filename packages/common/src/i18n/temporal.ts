/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Structural type that a `Temporal.Instant` is assignable to.
 *
 * Angular declares its own minimal types so that its public API does not depend on the
 * `esnext.temporal` TypeScript library.
 *
 * @publicApi
 */
export interface TemporalInstantLike {
  readonly epochMilliseconds: number;
  readonly [Symbol.toStringTag]: 'Temporal.Instant';
}

/**
 * Structural type that a `Temporal.ZonedDateTime` is assignable to.
 *
 * @see {@link TemporalInstantLike}
 *
 * @publicApi
 */
export interface TemporalZonedDateTimeLike {
  readonly epochMilliseconds: number;
  readonly offsetNanoseconds: number;
  readonly calendarId: string;
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
  readonly second: number;
  readonly millisecond: number;
  withCalendar(calendar: string): {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
  };
  readonly [Symbol.toStringTag]: 'Temporal.ZonedDateTime';
}

/**
 * Structural type that a `Temporal.PlainDateTime` is assignable to.
 *
 * @see {@link TemporalInstantLike}
 *
 * @publicApi
 */
export interface TemporalPlainDateTimeLike {
  readonly calendarId: string;
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
  readonly second: number;
  readonly millisecond: number;
  withCalendar(calendar: string): {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
  };
  readonly [Symbol.toStringTag]: 'Temporal.PlainDateTime';
}

/**
 * Structural type that a `Temporal.PlainDate` is assignable to.
 *
 * @see {@link TemporalInstantLike}
 *
 * @publicApi
 */
export interface TemporalPlainDateLike {
  readonly calendarId: string;
  readonly year: number;
  readonly month: number;
  readonly day: number;
  withCalendar(calendar: string): {
    readonly year: number;
    readonly month: number;
    readonly day: number;
  };
  readonly [Symbol.toStringTag]: 'Temporal.PlainDate';
}

/**
 * The Temporal values that can be formatted as a date.
 *
 * @publicApi
 */
export type TemporalDateLike =
  | TemporalInstantLike
  | TemporalZonedDateTimeLike
  | TemporalPlainDateTimeLike
  | TemporalPlainDateLike;

/** A Temporal value that carries a wall-clock date and, optionally, a wall-clock time. */
export type TemporalWallClockLike =
  | TemporalZonedDateTimeLike
  | TemporalPlainDateTimeLike
  | TemporalPlainDateLike;

/** Wall-clock fields in the ISO 8601 calendar. The time fields are absent for a plain date. */
export interface IsoWallClock {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour?: number;
  readonly minute?: number;
  readonly second?: number;
  readonly millisecond?: number;
}

const ISO_CALENDAR = 'iso8601';
const NANOSECONDS_PER_MINUTE = 60e9;

/**
 * Returns the `Symbol.toStringTag` of a Temporal object, e.g. `Temporal.Instant`, or `null` if the
 * value is not a Temporal object.
 *
 * The tag is used instead of `instanceof` so that neither the `Temporal` global nor a specific
 * polyfill has to be referenced.
 */
export function getTemporalTag(value: unknown): string | null {
  if (typeof value !== 'object' || value === null) {
    return null;
  }
  const tag = (value as {[Symbol.toStringTag]?: unknown})[Symbol.toStringTag];
  return typeof tag === 'string' && tag.startsWith('Temporal.') ? tag : null;
}

export function isTemporalZonedDateTime(value: unknown): value is TemporalZonedDateTimeLike {
  return getTemporalTag(value) === 'Temporal.ZonedDateTime';
}

/**
 * Returns the offset of a zoned date-time in the format of `Date.prototype.getTimezoneOffset`,
 * i.e. in minutes and positive when the time zone is behind UTC.
 */
export function getTemporalTimezoneOffset(value: TemporalZonedDateTimeLike): number {
  return -Math.round(value.offsetNanoseconds / NANOSECONDS_PER_MINUTE);
}

/**
 * Whether the value is a Temporal value without a time zone, i.e. one that describes the same
 * wall-clock date and time everywhere.
 */
export function isTemporalPlainValue(
  value: unknown,
): value is TemporalPlainDateTimeLike | TemporalPlainDateLike {
  const tag = getTemporalTag(value);
  return tag === 'Temporal.PlainDateTime' || tag === 'Temporal.PlainDate';
}

/**
 * Returns the wall-clock fields of a Temporal value in the ISO 8601 calendar, which is the
 * calendar that the date formatters operate on.
 */
export function getIsoWallClock(value: TemporalWallClockLike): IsoWallClock {
  return value.calendarId === ISO_CALENDAR ? value : value.withCalendar(ISO_CALENDAR);
}
