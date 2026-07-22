<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;



class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'role',
        'email',
        'username',
        'password',
        'target',
        'control_number_target',
        'street',
        'status',
        'invitation_token',
        'invitation_expires_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'invitation_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'invitation_expires_at' => 'datetime',
    ];

    public function reports() {
        return $this->hasMany(Report::class);
    }

    public function supervisedReports() {
        return $this->hasMany(Report::class, 'supervisor_id');
    }

    public function control_number() {
        return $this->hasMany(ControlNumber::class);
    }

    /**
     * Standard control-number target per role, applied automatically when a
     * user is created/assigned a role rather than entered by hand each time.
     */
    public const CONTROL_NUMBER_TARGETS = [
        'collector' => 100000,
        'enforcement' => 150000,
    ];

    public static function defaultControlNumberTarget(string $role): ?int
    {
        return static::CONTROL_NUMBER_TARGETS[$role] ?? null;
    }

    public function dashboardRoute(): string
    {
        return match ($this->role) {
            'admin' => '/admin/dashboard',
            'supervisor' => '/supervisor/dashboard',
            default => '/',
        };
    }

    /**
     * Build a unique "f.lastname" username (e.g. "s.mchuma"), falling back to
     * more leading letters and then a numeric suffix on collision.
     */
    public static function generateUsername(string $firstName, string $lastName, $excludeId = null): string
    {
        $firstName = strtolower(preg_replace('/\s+/', '', $firstName));
        $lastName = strtolower(preg_replace('/\s+/', '', $lastName));

        $taken = function (string $candidate) use ($excludeId) {
            $query = static::where('username', $candidate);

            if ($excludeId) {
                $query->where('id', '!=', $excludeId);
            }

            return $query->exists();
        };

        $lettersUsed = 1;
        $username = substr($firstName, 0, $lettersUsed) . '.' . $lastName;

        while ($taken($username) && $lettersUsed < strlen($firstName)) {
            $lettersUsed++;
            $username = substr($firstName, 0, $lettersUsed) . '.' . $lastName;
        }

        // Full first name still collides (e.g. two users with identical names) -
        // guarantee uniqueness with a numeric suffix instead of saving a duplicate.
        if ($taken($username)) {
            $baseUsername = $username;
            $suffix = 2;
            while ($taken($username)) {
                $username = $baseUsername . $suffix;
                $suffix++;
            }
        }

        return $username;
    }

}
