<?php

namespace App\Services;

use App\Models\Placement;

class PlacementService
{
    /**
     * Get all placements
     */
    public function getAllPlacements()
    {
        return Placement::orderBy('name')->get();
    }

    /**
     * Find placement by student name
     */
    public function findStudent(string $keyword)
    {
        return Placement::where(
            'name',
            'LIKE',
            "%{$keyword}%"
        )->first();
    }

    /**
     * Find placements by company
     */
    public function findCompany(string $company)
    {
        return Placement::where(
            'company',
            'LIKE',
            "%{$company}%"
        )->get();
    }

    /**
     * Find placements by domain
     */
    public function findDomain(string $domain)
    {
        return Placement::where(
            'domain',
            'LIKE',
            "%{$domain}%"
        )->get();
    }

    /**
     * Format one placement
     */
    public function formatPlacement(Placement $placement): string
    {
        return

"Student : {$placement->name}

Company : {$placement->company}

Domain : {$placement->domain}

Batch : {$placement->batch}

LinkedIn : {$placement->linkedin}

Social : {$placement->social}

";
    }

    /**
     * Format all placements
     */
    public function formatAllPlacements(): string
    {
        $placements = $this->getAllPlacements();

        if ($placements->isEmpty()) {

            return "No placement records available.";
        }

        $text = "";

        foreach ($placements as $placement) {

            $text .=
                $this->formatPlacement($placement);

            $text .=
                "\n----------------------------------------\n";
        }

        return $text;
    }

    /**
     * Build prompt for one student
     */
    public function buildStudentPrompt(string $keyword)
    {
        $placement = $this->findStudent($keyword);

        if (!$placement) {

            return null;
        }

        return $this->formatPlacement($placement);
    }

    /**
     * Build prompt for one company
     */
    public function buildCompanyPrompt(string $company)
    {
        $placements = $this->findCompany($company);

        if ($placements->isEmpty()) {

            return null;
        }

        $text = "";

        foreach ($placements as $placement) {

            $text .=
                $this->formatPlacement($placement);

            $text .=
                "\n----------------------------------------\n";
        }

        return $text;
    }

    /**
     * Build prompt for one domain
     */
    public function buildDomainPrompt(string $domain)
    {
        $placements = $this->findDomain($domain);

        if ($placements->isEmpty()) {

            return null;
        }

        $text = "";

        foreach ($placements as $placement) {

            $text .=
                $this->formatPlacement($placement);

            $text .=
                "\n----------------------------------------\n";
        }

        return $text;
    }

    /**
     * Build prompt for all placements
     */
    public function buildPlacementsPrompt()
    {
        return $this->formatAllPlacements();
    }

    /**
     * Total placement count
     */
    public function totalPlacements(): int
    {
        return Placement::count();
    }

    /**
     * Latest placements
     */
    public function latestPlacements($limit = 5)
    {
        return Placement::latest()->take($limit)->get();
    }
}